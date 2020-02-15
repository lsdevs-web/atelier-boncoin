<?php


namespace App\Events;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Annonce;
use DateTime;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class AnnonceUserSubscriber implements EventSubscriberInterface
{

    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setAnnonceUser', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setAnnonceUser(ViewEvent $event)
    {
        $annonce = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        $user = $this->security->getUser();


        if ($annonce instanceof Annonce && $method === "POST") {
            $annonce->setUser($user);
            $annonce->setPostedAt(new DateTime());
        }


    }

}