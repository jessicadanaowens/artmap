class Rides < ActiveRecord::Migration
  def change
    create_table :rides do |t|
      t.string :title
      t.integer :lat
      t.integer :lon
      t.timestamps
    end
  end
end
