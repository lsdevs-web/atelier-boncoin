<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Cocur\Slugify\Slugify;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

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
 * }
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
     */
    private $titre;

    /**
     * @ORM\Column(type="text")
     * @Groups({"annonces_read", "users_read"})
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
     */
    private $prix;

    /**
     * @ORM\Column(type="text")
     * @Groups({"annonces_read", "users_read"})
     */
    private $intro;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"annonces_read", "users_read"})
     */
    private $coverImage;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Image", mappedBy="annonce", orphanRemoval=true)
     * @Groups({"annonces_read", "users_read"})
     */
    private $images;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="annonces")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"annonces_read"})
     */
    private $user;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"annonces_read", "users_read"})
     */
    private $categorie;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"annonces_read", "users_read"})
     */
    private $region;

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
        $this->titre = $titre;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
    }

    public function getPrix(): ?float
    {
        return $this->prix;
    }

    public function setPrix(float $prix): self
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
        $this->intro = $intro;

        return $this;
    }

    public function getCoverImage(): ?string
    {
        return $this->coverImage;
    }

    public function setCoverImage(string $coverImage): self
    {
        $this->coverImage = $coverImage;

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
        $this->categorie = $categorie;

        return $this;
    }

    public function getRegion(): ?string
    {
        return $this->region;
    }

    public function setRegion(string $region): self
    {
        $this->region = $region;

        return $this;
    }
}
