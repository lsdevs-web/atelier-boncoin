<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 *
 * @ORM\Entity(repositoryClass="App\Repository\ImageRepository")
 */
class Image
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
     * @Assert\Type(type="string", message="L'url doit être du texte")
     * @Assert\NotBlank(message="L'url de l'image ne peut pas être vide")
     * @Assert\Url(message="Veuillez entrez un url valide")
     */
    private $url;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"annonces_read", "users_read"})
     * @Assert\NotBlank(message="La légende de l'image ne peut pas être vide")
     * @Assert\Length(min="10", minMessage="La légende doit faire au moins 10 caractères", max="100", maxMessage="La légende ne peut pas faire plus de 100 caractères")
     * @Assert\Type(type="string", message="La légende doit être du texte")
     */
    private $caption;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Annonce", inversedBy="images")
     * @ORM\JoinColumn(nullable=false)
     */
    private $annonce;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(string $url): self
    {
        $this->url = strip_tags($url);

        return $this;
    }

    public function getCaption(): ?string
    {
        return $this->caption;
    }

    public function setCaption(string $caption): self
    {
        $this->caption = strip_tags($caption);

        return $this;
    }

    public function getAnnonce(): ?Annonce
    {
        return $this->annonce;
    }

    public function setAnnonce(?Annonce $annonce): self
    {
        $this->annonce = $annonce;

        return $this;
    }
}
