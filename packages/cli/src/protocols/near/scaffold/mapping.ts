export const generatePlaceholderHandlers = () =>
  `
  import { near, BigInt } from '@starknet-graph/graph-ts'
  import { ExampleEntity } from '../generated/schema'

  export function handleReceipt(receiptWithOutcome: near.ReceiptWithOutcome): void {
    // Entities can be loaded from the store using a string ID; this ID
    // needs to be unique across all entities of the same type
    let entity = ExampleEntity.load(receiptWithOutcome.receipt.id.toHex())

    // Entities only exist after they have been saved to the store;
    // \`null\` checks allow to create entities on demand
    if (!entity) {
      entity = new ExampleEntity(receiptWithOutcome.receipt.id.toHex())

      // Entity fields can be set using simple assignments
      entity.count = BigInt.fromI32(0)
    }

    // BigInt and BigDecimal math are supported
    entity.count = entity.count + BigInt.fromI32(1)

    // Entity fields can be set based on receipt information
    entity.block = receiptWithOutcome.block.header.hash

    // Entities can be written to the store with \`.save()\`
    entity.save()

    // Note: If a handler doesn't require existing field values, it is faster
    // _not_ to load the entity from the store. Instead, create it fresh with
    // \`new Entity(...)\`, set the fields that should be updated and save the
    // entity back to the store. Fields that were not set or unset remain
    // unchanged, allowing for partial updates to be applied.
  }
`;
