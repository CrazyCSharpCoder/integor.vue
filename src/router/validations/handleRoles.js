function rolesAreSpecified(roles) {
    return roles !== undefined
}

function ensureArray(roles) {
    return roles instanceof Array ? roles : [roles]
}

function checkRoles(userRole, roles, isAllow) {
    let allowed = !isAllow

    for (let role of roles) {
        if (userRole === role) {
            return isAllow
        }
    }

    return allowed
}

function roleHasAccess(userRole, route) {
    let allowFor = route.meta.allowFor
    let forbidFor = route.meta.forbidFor

    // console.log('allowFor', allowFor, rolesAreSpecified(allowFor))
    // console.log('forbidFor', forbidFor, rolesAreSpecified(forbidFor))

    if (!rolesAreSpecified(allowFor) && !rolesAreSpecified(forbidFor))
        return true
    if (rolesAreSpecified(allowFor) && rolesAreSpecified(forbidFor))
        throw new Error('Route cannot contain both allowFor and forbidFor in its meta')

    if (rolesAreSpecified(allowFor))
        return checkRoles(userRole, ensureArray(allowFor), true)
    if (rolesAreSpecified(forbidFor))
        return checkRoles(userRole, ensureArray(forbidFor), false)

    return true
}

export {roleHasAccess}
