<?php

namespace App\DataFixtures;

use App\Entity\Annonce;
use App\Entity\ContactMessage;
use App\Entity\Image;
use App\Entity\User;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{

    private $passwordEncoder;

    /**
     * AppFixtures constructor.
     * @param UserPasswordEncoderInterface $passwordEncoder
     */
    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');
        $categories = ["Outillage", "Technologie", "Automobile"];
        $region = ["Midy-Pyrénnées", "Alsace", "Ile-de-France"];

        for ($u = 0; $u <= 10; $u++) {
            $user = new User();
            $hash = $this->passwordEncoder->encodePassword($user, 'password');
            $user->setEmail($faker->email)
                ->setNom($faker->lastName)
                ->setPrenom($faker->firstName)
                ->setRoles(['ROLE_USER'])
                ->setPassword($hash);

            for ($a = 1; $a <= mt_rand(3, 20); $a++) {
                $annonce = new Annonce();

                $annonce->setTitre($faker->sentence())
                    ->setIntro($faker->paragraph(2))
                    ->setDescription($faker->realText(550))
                    ->setCoverImage($faker->imageUrl(1000, 350))
                    ->setPrix(mt_rand(10, 440))
                    ->setUser($user)
                    ->setCategorie($categories[mt_rand(0, count($categories) - 1)])
                    ->setRegion($region[mt_rand(0, count($region) - 1)])
                    ->setPostedAt(new DateTime());

                for ($i = 1; $i <= mt_rand(2, 7); $i++) {
                    $image = new Image();
                    $image->setAnnonce($annonce)
                        ->setCaption($faker->paragraph(1))
                        ->setUrl($faker->imageUrl());
                    $manager->persist($image);
                }

                for ($i = 1; $i <= mt_rand(0, 2); $i++) {
                    $message = new ContactMessage();
                    $message->setUser($user)
                        ->setAnnonce($annonce)
                        ->setTitle($faker->sentence('5'))
                        ->setContent($faker->realText());
                    $annonce->addContactMessage($message);

                    $manager->persist($message);
                }

                $manager->persist($annonce);

            }


            $manager->persist($user);

        }


        $manager->flush();
    }
}
