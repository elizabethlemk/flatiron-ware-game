class GameSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :scores
end
