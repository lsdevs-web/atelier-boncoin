<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Cocur\Slugify\Slugify;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\AnnonceRepository")
 * @ORM\HasLifecycleCallbacks()
 * @ApiResource(
 *     attributes={
 *     "pagination_enabled"=false,
 *     "order": {"prix":"desc"}
 *     },
 *     normalizationContext={
 *     "groups"={"annonces_read"}
 *    },
 *     denormalizationContext={"disable_type_enforcement"=true}
 * )
 * @ApiFilter(SearchFilter::class, properties={"titre":"partial", "prix"})
 * @ApiFilter(OrderFilter::class)
 */
class Annonce
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"annonces_read", "users_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"annonces_read", "users_read"})
     * @Assert\NotBlank(message="L'annonce doit avoir un titre")
     * @Assert\Length(min="10", minMessage="Le titre doit faire plus de 10 caractères", max="255", maxMessage="Le titre ne peut pas faire plus de 255 caractères")
     */
    private $titre;

    /**
     * @ORM\Column(type="text")
     * @Groups({"annonces_read", "users_read"})
     * @Assert\NotBlank(message="L'annonce doit avoir une description")
     * @Assert\Length(min="55", minMessage="L'annonce doit faire plus de 10 caractères", max="255", maxMessage="La description ne peut pas faire plus de 255 caractères")
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"annonces_read", "users_read"})
     */
    private $slug;

    /**
     * @ORM\Column(type="float")
     * @Groups({"annonces_read", "users_read"})
     * @Assert\NotBlank(message="L'annonce doit avoir un prix")
     * @Assert\Type(type="numeric", message="Le prix doit être un nombre")
     * @Assert\PositiveOrZero(message="Le prix ne peut pas être négatif")
     */
    private $prix;

    /**
     * @ORM\Column(type="text")
     * @Groups({"annonces_read", "users_read"})
     * @Assert\NotBlank(message="L'annonce doit avoir une introduction")
     * @Assert\Length(min="10", minMessage="L'introduction' doit faire plus de 10 caractères", max="255", maxMessage="L'introduction ne peut pas faire plus de 255 caractères")
     */
    private $intro;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"annonces_read", "users_read"})
     * @Assert\NotBlank(message="L'annonce doit avoir une image de couverture")
     * @Assert\Type(type="string", message="L'image de couverture doit être une url")
     */
    private $coverImage;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Image", mappedBy="annonce", orphanRemoval=true, cascade={"persist"})
     * @Groups({"annonces_read", "users_read"})
     */
    private $images;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="annonces")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"annonces_read"})
     * @Assert\NotNull(message="L'annonce doit avoir un utilisateur")
     */
    private $user;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"annonces_read", "users_read"})
     * @Assert\NotNull(message="L'annonce doit avoir une catégories")
     * @Assert\Type(type="string", message="La catégorie doit être du texte")
     */
    private $categorie;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"annonces_read", "users_read"})
     * @Assert\NotNull(message="L'annonce doit avoir une région")
     * @Assert\Type(type="string", message="La région doit être du texte")
     */
    private $region;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"annonces_read", "users_read"})
     * @Assert\NotNull(message="L'annonce doit avoir une date de création")
     * @Assert\Type(
     * type = "\DateTime",
     * message = "La date renseignée doit être au format YYYY-MM-DD !"
     * )
     */
    private $postedAt;

    public function __construct()
    {
        $this->images = new ArrayCollection();
    }

    /**
     * Initialisation du Slug
     *
     * @ORM\PrePersist()
     * @ORM\PreUpdate()
     */
    public function initSLug()
    {
        $slugify = new Slugify();

        if (empty($this->slug)) {
            $this->slug = $slugify->slugify($this->titre);
        }
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitre(): ?string
    {
        return $this->titre;
    }

    public function setTitre(string $titre): self
    {
        $this->titre = strip_tags($titre);

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = strip_tags($description);

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = strip_tags($slug);

        return $this;
    }

    public function getPrix(): ?float
    {
        return $this->prix;
    }

    public function setPrix($prix): self
    {
        $this->prix = $prix;

        return $this;
    }

    public function getIntro(): ?string
    {
        return $this->intro;
    }

    public function setIntro(string $intro): self
    {
        $this->intro = strip_tags($intro);

        return $this;
    }

    public function getCoverImage(): ?string
    {
        return $this->coverImage;
    }

    public function setCoverImage(string $coverImage): self
    {
        $this->coverImage = strip_tags($coverImage);

        return $this;
    }

    /**
     * @return Collection|Image[]
     */
    public function getImages(): Collection
    {
        return $this->images;
    }

    public function addImage(Image $image): self
    {
        if (!$this->images->contains($image)) {
            $this->images[] = $image;
            $image->setAnnonce($this);
        }

        return $this;
    }

    public function removeImage(Image $image): self
    {
        if ($this->images->contains($image)) {
            $this->images->removeElement($image);
            // set the owning side to null (unless already changed)
            if ($image->getAnnonce() === $this) {
                $image->setAnnonce(null);
            }
        }

        return $this;
    }

    /**
     * @return User|null
     */
    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getCategorie(): ?string
    {
        return $this->categorie;
    }

    public function setCategorie(string $categorie): self
    {
        $this->categorie = strip_tags($categorie);

        return $this;
    }

    public function getRegion(): ?string
    {
        return $this->region;
    }

    public function setRegion(string $region): self
    {
        $this->region = strip_tags($region);

        return $this;
    }

    public function getPostedAt(): ?DateTimeInterface
    {
        return $this->postedAt;
    }

    public function setPostedAt($postedAt): self
    {
        $this->postedAt = $postedAt;

        return $this;
    }

}
