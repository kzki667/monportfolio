# Diagnostic de connectivité

## Objectif
Identifier rapidement l’origine d’un problème réseau sur un poste ou un service.

## Étapes
1. Vérifier le lien physique et les voyants réseau.
2. Contrôler l’adresse IP avec `ipconfig` ou `ip a`.
3. Tester la passerelle avec un ping.
4. Tester une adresse externe et un nom de domaine.
5. Vérifier le DNS si l’IP répond mais pas le nom.
6. Contrôler le pare-feu et les VLAN si nécessaire.

## Commandes utiles
- `ping`
- `tracert` / `traceroute`
- `nslookup`
- `ipconfig` / `ip a`
