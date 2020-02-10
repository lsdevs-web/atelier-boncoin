<?php


namespace App\DoctrineExtensions;


use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Annonce;
use App\Entity\User;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Security;

/**
 * Class CurrentUserExtension
 * @package App\DoctrineExtensions
 */
class CurrentUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{

    private $security;
    private $request;
    private $auth;

    /**
     * CurrentUserExtension constructor.
     * @param Security $security
     * @param RequestStack $request
     * @param AuthorizationCheckerInterface $auth
     */
    public function __construct(Security $security, RequestStack $request, AuthorizationCheckerInterface $auth)
    {
        $this->security = $security;
        $this->request = $request;
        $this->auth = $auth;
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null)
    {

        $this->addWhere($queryBuilder, $resourceClass);

    }

    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass)
    {

        $user = $this->security->getUser();

        $data = $this->request->getCurrentRequest()->get("all");


        if (($resourceClass === Annonce::class && $data == 0) && !$this->auth->isGranted("ROLE_ADMIN") && $user instanceof User) {
            $rootAlias = $queryBuilder->getRootAliases()[0];
            $queryBuilder->andWhere("$rootAlias.user  = :user");
            $queryBuilder->setParameter("user", $user);


        }

    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, string $operationName = null, array $context = [])
    {
        $this->addWhere($queryBuilder, $resourceClass);

    }

}