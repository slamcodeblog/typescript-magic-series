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

const azureResourcePaths = [
    testResourceId,
    '/subscriptions/MySuperSubscription/resourceGroups/MyAwesomeResourceGroup/providers/Micsoroft.Web/serverfarms/MyServicePlan',
    '/subscriptions/Production/resourceGroups/SuperServiceResources/providers/Micsoroft.Storage/storageAccounts/ServiceMainStorage',
] as const

type SystemAzureResource = ExtractAzureResource<typeof azureResourcePaths[number]>

const SystemResource: SystemAzureResource = {
    subscription: 'MySuperSubscription',
    resourceGroup: 'MyAwesomeResourceGroup',
    provider: 'Micsoroft.Web',
    category: 'serverfarms',
    resourceId: 'MyServicePlan'
}

type AzureService = ExtractAzureResource<typeof azureResourcePaths[number]>['category']

type SimpleResource<T extends string> =  T extends `/subscriptions/${infer _}/resourceGroups/${infer __}/providers/${infer ___}/${infer Category}/${infer ResourceId}`
    ? {
        type: 'azure',
        service: Category,
        id: ResourceId,
        fullId: T
    }
    : never;

type AzureResource = SimpleResource<typeof azureResourcePaths[number]>

const simpleResource: AzureResource = {
    type: 'azure',
    service: 'serverfarms',
    id: 'MyServicePlan',
    fullId: '/subscriptions/MySuperSubscription/resourceGroups/MyAwesomeResourceGroup/providers/Micsoroft.Web/serverfarms/MyServicePlan'
}