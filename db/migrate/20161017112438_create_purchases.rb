class CreatePurchases < ActiveRecord::Migration[5.0]
  def change
    create_table :purchases do |t|
      t.integer :userId
      t.integer :movieId
      t.integer :chargeId

      t.timestamps
    end
  end
end
