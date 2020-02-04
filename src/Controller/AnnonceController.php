<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class AnnonceController extends AbstractController
{
    /**
     * @Route("/annonces", name="annonces_index")
     */
    public function index()
    {
        $test = ["Laurent" => 12, "Test" => "mdr"];

        return $this->render('annonce/index.html.twig', [
            'controller_name' => 'AnnonceController',
            'test' => $test
        ]);
    }
}
