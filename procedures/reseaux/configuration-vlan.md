# Configuration VLAN

## Objectif
Segmenter le réseau pour séparer les usages et améliorer la sécurité.

## Pré-requis
- Accès au switch manageable
- Plan d’adressage
- Numéros de VLAN définis

## Étapes
1. Créer les VLAN nécessaires sur le switch.
2. Affecter les ports aux VLAN correspondants.
3. Configurer le trunk si nécessaire vers le routeur ou le switch principal.
4. Vérifier l’adressage IP et la passerelle.
5. Tester la communication entre les équipements autorisés.

## Vérifications
- Le poste reçoit la bonne IP
- Le ping vers la passerelle fonctionne
- L’isolation entre VLAN est respectée
