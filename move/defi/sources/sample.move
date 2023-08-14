module defi::sample {

  use sui::object::{Self, UID};
  use sui::transfer::transfer;
  use sui::tx_context;
  use sui::tx_context::TxContext;

  struct SampleObject has key, store {
    id: UID
  }

  /// Return the object, can be used in later steps
  public fun composable(ctx: &mut TxContext): SampleObject {
    SampleObject {
      id: object::new(ctx)
    }
  }

  /// Instea of return object, here it send to user
  public fun non_composable(ctx: &mut TxContext) {
    let sample_object = SampleObject {
      id: object::new(ctx)
    };
    transfer(sample_object, tx_context::sender(ctx))
  }
}
