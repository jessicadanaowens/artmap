require 'rails_helper'

describe "home page", :js => true do
  it "displays a search field" do
    visit "/"
    expect(page).to have_content "Find people and stuff to do"
  end
end