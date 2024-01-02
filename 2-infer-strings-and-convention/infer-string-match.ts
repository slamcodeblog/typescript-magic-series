import * as routesJson from './routes.json'
import { ROUTES } from './routes';

// const RoutesJson: string = "['home','blog/list','blog/post','blog/{articleId}','blog/{articleId}/edit','contact/location','contact/form']";

const Routes = 
ROUTES;
// JSON.parse(RoutesJson) as string[]
    // routesJson
// [
//     'home',
//     'blog/list',
//     'blog/post',
//     'blog/{articleId:int}',
//     'blog/{articleId}/edit',
//     'contact/location',
//     'contact/form'
//  ] as const;

type Route = typeof Routes;
 
 type SimplePath<T extends string> = T extends `${infer MainPage}/${infer SubPage}` 
 ? {
    path: MainPage,
    subPath: SimplePath<SubPage>
 }
 : T

 type Path<T extends string> = 
    T extends `${infer MainPage}/${infer SubPage}` 
    ? { 
        path: MainPage,
        parameter?: RouteParameterPath<MainPage>,
        subPath: Path<SubPage>
     } :
     (
        T extends `${infer MainPage}` 
        ? {
            path: MainPage,
            parameter?: RouteParameterPath<MainPage>
        }
        : {
            path: T
        }
    )
     
 type PathWithQuery<T extends string> = T extends `${infer RoutePath}?${infer Query}`
    ? Path<RoutePath> & {
        query: RouteQuery<Query>
      }
    : Path<T>

type RouteParameterPath<T extends string> = T extends `\{${infer Param}:${infer Type}\}` 
    ? {
        name: Param,
        type: Type
    }
    : (T extends `\{${infer Param}\}` ?
        {
            name: Param
        }
        : never
    )

type RouteQueryParameter<T extends string> = T extends `${infer Name}=${infer Value}` 
    ? {
        name: Name,
        value: Value
    }
    : never;

type RouteQuery<T extends string> = T extends `${infer FirstParam}&${infer OtherParams}`
    ? [ RouteQueryParameter<FirstParam> ] & RouteQuery<OtherParams>
    : [ RouteQueryParameter<T> ]

type HomePath = Path<'home'>
type BlogArticlePath = Path<typeof Routes[3]>
type BlogArticleEditPath = Path<typeof Routes[4]>
type BlogArticleQueryPath = PathWithQuery<typeof Routes[7]>

type RoutePath = Path<typeof Routes[number]>

const somePath: RoutePath = {
    path: 'blog',
    subPath: {
        path: '{articleId}',
        parameter: {
            name: 'articleId'
        },
        subPath: {
            path: 'edit'
        }
    }
} 

const jsonRoutePaths = routesJson as unknown as RoutePath[]

jsonRoutePaths.forEach(rp => console.log(rp));

// simple path
type HomeSimplePath = SimplePath<'home'>
type BlogArticleSimplePath = SimplePath<typeof Routes[3]>
type BlogArticleEditSimplePath = SimplePath<typeof Routes[4]>