## ADDED Requirements

### Requirement: La pantalla del emblema invita a seguir

La pantalla del emblema SHALL mostrar una invitación a seguir bajando, construida con un motivo de la marca. SHALL entrar junto con la navegación, una vez que el trazo termina, y SHALL apagarse apenas se empieza a bajar: ya cumplió.

La invitación SHALL vivir en la pantalla del emblema y SHALL no estar en la pantalla a la que se llega bajando, donde quien la ve ya bajó.

#### Scenario: La pantalla del emblema dice cómo seguir

- **WHEN** el emblema termina de dibujarse
- **THEN** aparece una invitación a seguir bajando, en la misma pantalla del emblema

#### Scenario: La invitación no sobrevive al scroll

- **WHEN** alguien empieza a bajar
- **THEN** la invitación se apaga, antes incluso de que el emblema termine de irse

#### Scenario: No está donde no hace falta

- **WHEN** se mira la pantalla de las fotos
- **THEN** no hay una invitación a bajar, porque para llegar ahí ya hubo que bajar

### Requirement: Lo que entra después del trazo entra con transición

Lo que aparezca al terminar el trazo SHALL hacerlo con una transición, nunca con un corte, y SHALL no aparecer antes de que el trazo haya terminado.

#### Scenario: El orden se respeta

- **WHEN** se observa la secuencia completa
- **THEN** primero se termina de escribir la marca y recién después entra lo demás

#### Scenario: Con movimiento reducido

- **WHEN** se carga la portada con la preferencia de movimiento reducido activada
- **THEN** todo está desde el primer momento, sin esperas ni transiciones
