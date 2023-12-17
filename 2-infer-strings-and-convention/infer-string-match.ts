import * as routesJson from './routes.json'

// const RoutesJson: string = "['home','blog/list','blog/post','blog/{articleId}','blog/{articleId}/edit','contact/location','contact/form']";

const Routes = 
// JSON.parse(RoutesJson) as string[]
    // routesJson
[
    'home',
    'blog/list',
    'blog/post',
    'blog/{articleId:int}',
    'blog/{articleId}/edit',
    'contact/location',
    'contact/form'
 ] as const;

 
 type SimplePath<T extends string> = T extends `${infer MainPage}/${infer SubPage}` 
 ? {
    path: MainPage,
    subPath: SimplePath<SubPage>
 }
 : T

 type Path<T extends string> = T extends `${infer MainPage}/${infer SubPage}` 
    ? { 
        path: MainPage,
        parameter?: RouteParameterPath<MainPage>,
        subPath: Path<SubPage>
     } :
     (
        T extends `${infer MainPage}` 
        ? {
            path: MainPage,
            parameter: RouteParameterPath<MainPage>
        }
        : {
            path: T
        }
    )
     
type RouteParameterPath<T extends string> = T extends `\{${infer Param}:${infer Type}\}` 
    ? {
        name: Param,
        type: Type
    }
    : (T extends `\{${infer Param}\}` ?
        {
            name: Param
        }
        : undefined
    )

type HomePath = Path<'home'>
type BlogArticlePath = Path<typeof Routes[3]>
type BlogArticleEditPath = Path<typeof Routes[4]>

type RoutePath = Path<typeof Routes[number]>

const somePath: RoutePath = {
    path: 'blog',
    subPath: {
        path: '{articleId}',
        parameter: {
            name: 'articleId'
        },
        subPath: {
            path: 'edit',
            parameter: undefined
        }
    }
} 

const jsonRoutePaths = routesJson as unknown as RoutePath[]

jsonRoutePaths.forEach(rp => console.log(rp));

// simple path
type HomeSimplePath = SimplePath<'home'>
type BlogArticleSimplePath = SimplePath<typeof Routes[3]>
type BlogArticleEditSimplePath = SimplePath<typeof Routes[4]>