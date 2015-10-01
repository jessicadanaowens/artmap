class PiecesController < ApplicationController
  respond_to :json

  def index
    @art = Piece.all
    render json: @art
  end

  def create
    @piece = Piece.new(title: params[:title], purchase_price: params[:purchasePrice])
    @artist = @piece.build_artist(first_name: params[:artistFirstName], last_name: params[:artistLastName])

    Piece.transaction do
      @piece.save!
      @artist.save!
    end

    if @piece.errors.any? || @artist.errors.any?
      render json: {piece_errors: @piece.errors, artist_errors: @artist.errors}, status: :unprocessable_entity
    else
      @piece.update_attributes(artist_id: @artist.id)

      @success_message = {success_message: "Your art was successfully added"}
      render json: @success_message
    end
  end
end