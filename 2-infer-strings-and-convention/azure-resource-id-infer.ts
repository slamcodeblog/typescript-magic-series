const testResourceId = '/subscriptions/MySuperSubscription/resourceGroups/MyAwesomeResourceGroup/providers/Micsoroft.Compute/disks/MyCMainHDD' as const;

type ExtractAzureResource<T extends string> = T extends `/subscriptions/${infer SubscriptionId}/resourceGroups/${infer ResourceGroupId}/providers/${infer Provider}/${infer Category}/${infer ResourceId}` ? 
{
    subscription: SubscriptionId,
    resourceGroup: ResourceGroupId,
    provider: Provider,
    category: Category,
    resourceId: ResourceId
}
: never;

type TestResource = ExtractAzureResource<typeof testResourceId>

const AzureResourcePaths = [
    testResourceId,
    '/subscriptions/MySuperSubscription/resourceGroups/MyAwesomeResourceGroup/providers/Micsoroft.Web/serverfarms/MyServicePlan',
    '/subscriptions/Production/resourceGroups/SuperServiceResources/providers/Micsoroft.Storage/storageAccounts/ServiceMainStorage',
] as const

type SystemAzureResource = ExtractAzureResource<typeof AzureResourcePaths[number]>

const SystemResource: SystemAzureResource = {
    subscription: 'MySuperSubscription',
    resourceGroup: 'MyAwesomeResourceGroup',
    provider: 'Micsoroft.Web',
    category: 'serverfarms',
    resourceId: 'MyServicePlan'
}