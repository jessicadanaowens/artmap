require 'rails_helper'

describe "home page", :js => true do
  it "displays a search field" do
    visit "/"
    expect(page).to have_content "hello"
  end
end