type Role = {
    name: RoleName,
    active: boolean
}

type RoleKey = keyof Role // 'name' | 'active'
type RoleNameKey = UserKey

type RoleName = 'admin' | 'customer' | 'guest'

type UserWithRoles<AvailableRoleName extends RoleName> = User & {
    readonly roles: Role[],
    addRole: (role: AvailableRoleName) => void
}

// Make properties required
type AdminUser = UserWithRoles<RoleName> & {
    [key in 'lastLoginDate' | 'dateOfBirth']-?: UserWithRoles<RoleName>[key]
}
// instances
const admin: 
// UserWithRoles 
AdminUser
= {
    login: "admin",
    email: "admin@admin.com",
    roles: [],
    addRole: function(role) { this.roles.push({ name: role, active: false }); },
    dateOfBirth: new Date(),
    lastLoginDate: new Date()
}

// leave only required properties in type
type GuestUser = {
    ['login']: User['login'] // gives you type safety and compatibility with bae type changes
}

// select multiple properties
type UserWithLoginAndEmail = {
    [K in 'login' | 'email']: User[K]
}

type UserWithoutEmail = {
    [K in keyof User as (K extends 'email' ? never : K)]: User[K]
}

const guest:
GuestUser
// User
// UserWithRoles
= {
    login: "guest"
}

// remove 
type NotAdminRoleName 
    = 'customer' | 'guest'
    //= RoleName extends 'admin' ? never : RoleName

// restrict roles array values
type CustomerUserWithRole = UserWithRoles<NotAdminRoleName>

const customer:
CustomerUserWithRole
= {
    login: "blah blah",
    email: 'akjas@kajs.com',
    roles: [{ name: 'admin', active: true}],
    addRole: function(role) { this.roles.push({ name: role, active: false }); },
}