class GamesController < ApplicationController
  def index
    @games = Game.all

    render json: @games
  end

  def create
    @game = Game.create(games_params)

    render json: @game
  end

  private
  def games_params
    params.permit(:user_id, :scores)
  end
end
