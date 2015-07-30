class ChangeLonAndLatToDecimal < ActiveRecord::Migration
  def change
    remove_column :markers, :lat, :decimal
    remove_column :markers, :lon, :decimal
    add_column :markers, :lat, :decimal
    add_column :markers, :lon, :decimal
  end
end
