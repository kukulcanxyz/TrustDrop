# TrustDrop, Monad Blitz MVP

## Resumen
TrustDrop es una app de compromisos públicos onchain para Monad. Un usuario define una meta, bloquea un depósito en MON, fija un deadline y nombra una wallet beneficiaria si falla. Si cumple, recupera su depósito. Si no cumple, la consecuencia se ejecuta onchain.

## Tesis del producto
Convertimos promesas en compromisos programables con consecuencia económica real.

Versión corta:
- If you complete it, you get your money back.
- If you fail, the contract sends the funds to the predefined beneficiary.

## Por qué esta idea sí sirve para Monad Blitz
- Se entiende en 10 segundos.
- El smart contract es core, no decoración.
- Tiene demo clara y memorable.
- Resuelve un problema humano real: procrastinación y falta de accountability.
- Monad encaja bien como capa de ejecución rápida y barata para compromisos onchain.

## Usuario inicial
Enfocar el MVP en un caso de uso único:
- builders en hackathons

Ejemplos:
- terminar el pitch deck hoy
- hacer deploy antes del deadline
- subir el repo final
- entregar la demo funcional

## Posicionamiento
No venderlo solo como una app de promesas.
Venderlo como:

**An onchain accountability primitive**

Frase recomendada:
**TrustDrop turns promises into programmable commitments on Monad.**

## Loop principal del producto
1. El usuario crea un commitment.
2. Define descripción, monto, deadline y beneficiary.
3. Deposita MON en el contrato.
4. Se genera una página pública del commitment.
5. Antes del deadline puede subir proof y marcarlo como completed.
6. Si completed, recupera el depósito.
7. Si expira sin completion, el beneficiary reclama los fondos.

## Mejores ajustes para el MVP

### 1. Caso de uso único
Empezar con builders y hackathons, no metas genéricas.

### 2. Ritual público
No dejarlo privado. El MVP debe incluir:
- commitment público
- countdown visible
- estado final claro
- consequence visible

### 3. Proof of completion
Agregar un campo simple de evidencia, sin oracle complejo:
- GitHub repo
- Vercel deploy
- screenshot
- texto corto

### 4. Consecuencia concreta
Mejor que “pierdes dinero”.
Usar ejemplos como:
- se va a un amigo
- se dona a una wallet
- va al prize pool del team

### 5. Contrato simple
Nada de disputas, reputación, voting o validación avanzada en MVP.

## MVP exacto

### Must have
- Wallet connect
- Create commitment
- Deposit en MON
- Public commitment page
- Countdown
- Proof field
- Complete action
- Refund claim
- Penalty claim

### Nice to have, solo si sobra tiempo
- Share link
- Copy link
- Presets como “ship repo”, “deploy app”, “submit pitch”

## Qué NO meter en MVP
- Oráculos
- Validación automática del cumplimiento
- Verificación por terceros
- Reputación onchain
- NFTs
- Pools grupales
- DAO governance
- IA judge

Todo eso se deja para roadmap.

## Arquitectura técnica recomendada

### Smart contract
Un solo contrato: `TrustDrop.sol`

#### Struct
- `creator`
- `beneficiary`
- `amount`
- `deadline`
- `description`
- `proof`
- `completed`
- `withdrawn`

#### Funciones
- `createCommitment() payable`
- `submitProofAndMarkComplete(uint256 id, string proof)`
- `claimRefund(uint256 id)`
- `claimPenalty(uint256 id)`
- `getCommitment(uint256 id)`

#### Reglas mínimas
- `msg.value == amount`
- solo creator puede marcar completed
- refund solo creator
- penalty solo beneficiary
- refund solo si completed
- penalty solo después del deadline
- evitar doble retiro

### Frontend
Stack recomendado:
- Next.js
- Tailwind
- wagmi
- viem
- RainbowKit o connect modal simple

Razón:
- ayuda a crear páginas públicas tipo `commitment/[id]`
- permite demo limpia rápido

## Pantallas

### 1. Landing
- qué hace TrustDrop
- CTA para crear commitment

### 2. Create commitment
Campos:
- description
- amount
- deadline
- beneficiary wallet
- optional proof placeholder

### 3. Commitment detail page
Mostrar:
- description
- creator
- beneficiary
- amount
- deadline
- countdown
- status
- proof si existe

Botones condicionales:
- Mark completed
- Claim refund
- Claim penalty

## Estados del producto
- Active
- Completed
- Refunded
- Expired
- Penalized

## Demo flow recomendado

### Caso éxito
1. Crear commitment
2. Depositar MON
3. Abrir página pública
4. Mostrar countdown
5. Subir proof
6. Marcar completed
7. Recuperar depósito

### Caso falla
8. Mostrar commitment expirado
9. Beneficiary reclama fondos

## Demo script, 90 a 120 segundos
Inicio:
“TrustDrop turns promises into programmable commitments on Monad.”

Narrativa:
1. Creo un compromiso: “ship the demo before 6 PM”
2. Deposito 0.01 MON
3. Se genera una página pública con countdown
4. Subo proof
5. Marco completed
6. Recupero mis fondos
7. Mostramos otro commitment que expiró
8. El beneficiary reclama el depósito

Cierre:
“We turn intention into accountability with onchain consequences.”

## Pitch corto
TrustDrop is a public onchain commitment app for builders. A user creates a goal, locks a deposit on Monad, sets a deadline, and defines who gets paid if they fail. If they complete the goal, they get their funds back. If not, the consequence executes onchain.

## División de trabajo sugerida

### Dev 1, contrato
- setup Foundry
- escribir contrato
- tests básicos
- deploy a Monad testnet
- export ABI + contract address

### Dev 2, frontend
- setup app
- wallet connect
- create form
- read contract state
- detail page
- action buttons
- success/error states

### Dev 3, polish/demo
- copy del producto
- countdown limpio
- sample commitments
- screenshots / branding
- pitch y guion del demo

## Orden recomendado de ejecución
1. Cerrar nombre
2. Crear repo
3. Definir stack
4. Construir contrato base
5. Deploy a testnet
6. Exportar ABI
7. Armar create form
8. Armar detail page
9. Conectar read/write contract
10. Pulir demo con dos commitments de ejemplo

## Recomendación final
La fuerza del proyecto no está en meter más features. Está en cerrar un loop muy claro:
- intención
- depósito
- countdown
- prueba
- resolución
- consecuencia onchain

Menos dashboard, más historia.
Menos complejidad, más demo sólido.

## Nombre recomendado
**TrustDrop**

Alternativas:
- PromisePot
- SkinInTheGame

Recomendación actual: quedarse con TrustDrop por claridad y recordación.