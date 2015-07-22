class CreateMarkersTable < ActiveRecord::Migration
  def change
    create_table :markers do |t|
      t.string :position
      t.string :address
      t.string :name
      t.boolean :gallery
      t.timestamps
    end
  end
end
