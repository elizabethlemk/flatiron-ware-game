class ScoresController < ApplicationController
  def index
    @scores = Score.all
    render json: @scores
  end

  def show
    @score = Score.find(params[:id])
    render json: @score
  end

  def create
    @score = Score.create(score_params)
    render json: @score
  end

  def update
    @score = Score.find(params[:id])
  end

  private

  def score_params
    params.permit(:user_id, :score)
  end
end
