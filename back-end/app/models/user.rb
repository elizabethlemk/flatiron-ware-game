class User < ApplicationRecord
  has_many :games, dependent: :destroy 
end
