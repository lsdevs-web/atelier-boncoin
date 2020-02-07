<?php


namespace App\DoctrineExtensions;


use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use App\Entity\Annonce;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Security;

/**
 * Class CurrentUserExtension
 * @package App\DoctrineExtensions
 */
class CurrentUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{

    private $security;
    private $request;

    /**
     * CurrentUserExtension constructor.
     * @param Security $security
     * @param RequestStack $request
     */
    public function __construct(Security $security, RequestStack $request)
    {
        $this->security = $security;
        $this->request = $request;
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null)
    {
        $user = $this->security->getUser();

        $data = $this->request->getCurrentRequest()->get("all");


        if ($resourceClass === Annonce::class && $data == 0) {
            $rootAlias = $queryBuilder->getRootAliases()[0];
            $queryBuilder->andWhere("$rootAlias.user  = :user");
            $queryBuilder->setParameter("user", $user);

//            dd($queryBuilder);

        }
    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, string $operationName = null, array $context = [])
    {
        // TODO: Implement applyToItem() method.
    }

}