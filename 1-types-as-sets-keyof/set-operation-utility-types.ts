// Set operations applied to types (sets of properties)
type Union<T1, T2> = T1 & T2 // yeah this ishere  just for completing the set

type Intersect<T1, T2> = {
    [key in keyof T1 & keyof T2]: Union<T1, T2>[key]
}

type Diff<T1, T2> = {
    [key in keyof T1 as (key extends keyof Intersect<T1, T2> ? never : key)]:
        T1[key]
}

type DiffSymetrical<T1, T2> = {
    [key in keyof Union<T1, T2> as 
        (key extends keyof Intersect<T1, T2> ? never : key)]:
            Union<T1, T2>[key]
}