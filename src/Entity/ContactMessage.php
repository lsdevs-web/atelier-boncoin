<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ContactMessageRepository")
 */
class ContactMessage
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"users_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"users_read"})
     * @Assert\NotBlank(message="Le message doit avoir un titre")
     * @Assert\Length(min="10", minMessage="Le titre doit faire plus de 10 caractères", max="255", maxMessage="Le titre ne peut pas faire plus de 255 caractères")
     * @Assert\Type(type="string", message="Le titre doit être du texte")
     */
    private $title;

    /**
     * @ORM\Column(type="text")
     * @Groups({"users_read"})
     * @Assert\NotBlank(message="Le message doit avoir une introduction")
     * @Assert\Length(min="10", minMessage="Le contenu doit faire plus de 10 caractères", max="255", maxMessage="Le contenu ne peut pas faire plus de 255 caractères")
     * @Assert\Type(type="string", message="Le contenu doit être du texte")
     */
    private $content;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="contactMessages")
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Annonce", inversedBy="contactMessages")
     * @ORM\JoinColumn(nullable=false)
     */
    private $annonce;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

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
