<?php


namespace App\Events;


use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JWTCreatedSubscriber
{

    /**
     * @param JWTCreatedEvent $event
     */
    public function AddDataJWT(JWTCreatedEvent $event)
    {
        $user = $event->getUser();
        $data = $event->getData();

        $data["nom"] = $user->getNom();
        $data["prenom"] = $user->getPrenom();

        $event->setData($data);

    }

}