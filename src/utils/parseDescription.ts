interface EventAttributes {
  aa?: string
  groupes?: string[]
  profs?: string[]
  profacros?: string[]
  salles?: string[]
  type?: string
}

const parseDesc = (description: string) => {
  const obj: EventAttributes = {}
  // chaque ligne de /description/ est de la forme: "truc : valeur"

  if (!description) return obj

  for (const item of description.split('\n')) {
    let [key, value] = item.split(' : ')
    if (!value) continue

    switch (key) {
      case 'Matière':
        obj.aa = value
        break
      case 'TD':
        obj.groupes = value.split(', ')
        break
      case 'Enseignant':
      case 'Enseignants':
        key = 'profs'
        obj.profs = value.split(', ')
        if (obj.profs.every(prof => prof.match(/^[A-Z][A-Z][A-Z]\b/))) {
          obj.profacros = obj.profs.map(prof => prof.slice(0, 3))
        }
        break
      case 'Salle':
      case 'Salles':
        obj.salles = value.split(', ')
        break
      case 'Type':
        obj.type = value
        break
      default:
    }
  }
  return obj
}

export { EventAttributes }
export default parseDesc
