<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @ApiResource(
 *     normalizationContext={
 *     "groups"={"users_read"}
 *     }
 * )
 * @ApiFilter(SearchFilter::class, properties={"nom":"partial", "prenom":"partial"})
 * @UniqueEntity("email", message="Cet email est déjà utilisé")
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"annonces_read", "users_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"annonces_read", "users_read"})
     * @Assert\NotNull(message="L'utilisateur doit avoir un email")
     * @Assert\NotBlank(message="L'email ne peut pas être vide")
     * @Assert\Email(message="L'email n'est pas au format valide")
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Assert\NotNull(message="Le mot de passe ne peut pas être null")
     * @Assert\NotBlank(message="Le mot de passe ne peut pas être vide")
     * @Assert\Length(min="10", minMessage="Le mot de passe doit faire au moins 10 caractères", max="255", maxMessage="Le mot de passe ne peut pas faire plus de 255 caractères")
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"annonces_read", "users_read"})
     * @Assert\NotNull(message="L'utilisateur doit avoir un prénom")
     * @Assert\NotBlank(message="Le prénom ne peut pas être vide")
     * @Assert\Type(type="string", message="Le prénom doit être du texte")
     * @Assert\Length(min="3", minMessage="Le prenom doit faire au moins 3 caractères", max="255", maxMessage="Le prénom ne peut pas faire plus de 255 caractères")
     */
    private $prenom;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"annonces_read", "users_read"})
     * @Assert\Type(type="string", message="Le nom doit être du texte")
     * @Assert\Length(min="3", minMessage="Le nom doit faire au moins 3 caractères", max="255", maxMessage="Le nom ne peut pas faire plus de 255 caractères")
     */
    private $nom;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Annonce", mappedBy="user", orphanRemoval=true)
     * @Groups({"users_read"})
     */
    private $annonces;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Regex(pattern="/^\(0\)[0-9]*$", message="Le numéro n'est pas au bon format")
     * @Assert\NotBlank(message="Le numéro de téléphone ne peut pas être nul")
     * @Groups({"users_read", "annonces_read"})
     */
    private $phone;

    public function __construct()
    {
        $this->annonces = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = strip_tags($email);

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string)$this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string)$this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): self
    {
        $this->prenom = strip_tags($prenom);

        return $this;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = strip_tags($nom);

        return $this;
    }

    /**
     * @return Collection|Annonce[]
     */
    public function getAnnonces(): Collection
    {
        return $this->annonces;
    }

    public function addAnnonce(Annonce $annonce): self
    {
        if (!$this->annonces->contains($annonce)) {
            $this->annonces[] = $annonce;
            $annonce->setUser($this);
        }

        return $this;
    }

    public function removeAnnonce(Annonce $annonce): self
    {
        if ($this->annonces->contains($annonce)) {
            $this->annonces->removeElement($annonce);
            // set the owning side to null (unless already changed)
            if ($annonce->getUser() === $this) {
                $annonce->setUser(null);
            }
        }

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): self
    {
        $this->phone = strip_tags($phone);

        return $this;
    }

}
