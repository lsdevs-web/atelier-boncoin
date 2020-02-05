<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

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
     * @Groups({"annonces_read"})
     * @Groups({"users_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"annonces_read"})
     * @Groups({"users_read"})
     */
    private $url;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"annonces_read"})
     * @Groups({"users_read"})
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
        $this->url = $url;

        return $this;
    }

    public function getCaption(): ?string
    {
        return $this->caption;
    }

    public function setCaption(string $caption): self
    {
        $this->caption = $caption;

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
