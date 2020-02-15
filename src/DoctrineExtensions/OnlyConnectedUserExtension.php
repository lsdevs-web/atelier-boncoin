<?php


namespace App\DoctrineExtensions;


use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Annonce;
use App\Entity\User;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Security;

class OnlyConnectedUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{

    private $security;
    private $auth;

    /**
     * OnlyConnectedUserExtension constructor.
     * @param Security $security
     * @param AuthorizationCheckerInterface $auth
     */
    public function __construct(Security $security, AuthorizationCheckerInterface $auth)
    {
        $this->security = $security;
        $this->auth = $auth;
    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, string $operationName = null, array $context = [])
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }


    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null)
    {
        $this->addWhere($queryBuilder, $resourceClass);
    }


    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass)
    {

        $user = $this->security->getUser();


        if (($resourceClass === User::class) && !$this->auth->isGranted("ROLE_ADMIN") && $user instanceof User) {
            $rootAlias = $queryBuilder->getRootAliases()[0];
            $queryBuilder->andWhere("$rootAlias = :user");
            $queryBuilder->setParameter("user", $user);
        }
    }
}
