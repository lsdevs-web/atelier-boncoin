<?php

namespace App\DataFixtures;

use App\Entity\Annonce;
use App\Entity\Image;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('FR-fr');

        for ($i = 1; $i <= 30; $i++) {
            $annonce = new Annonce();

            $annonce->setTitre($faker->sentence())
                ->setIntro($faker->paragraph(2))
                ->setDescription($faker->realText(550))
                ->setCoverImage($faker->imageUrl(1000, 350))
                ->setPrix(mt_rand(10, 440));

            for ($j = 1; $j <= mt_rand(2,7); $j++) {
                $image = new Image();
                $image->setAnnonce($annonce)
                ->setCaption($faker->paragraph(1))
                ->setUrl($faker->imageUrl());
                $manager->persist($image);
            }

            $manager->persist($annonce);
        }


        $manager->flush();
    }
}
