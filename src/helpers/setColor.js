export function setColor(countryRegion) {
    switch (countryRegion) {
        case 'Asia':
            return 'asia'
        case 'Americas':
            return 'americas'
        case 'Africa':
            return 'africa'
        case 'Oceania':
            return 'oceania'
        case 'Europe':
            return 'europe'
        default:
            return 'default';
    }

}