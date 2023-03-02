import { ServiceName } from '../../../common/types/service.type'
import TriggerIntegration from '../trigger'
import type { IngredientDefinition } from '../../../common/types/ingredient.type'
import type { Field, FieldDefinition } from '../../../common/types/field.type'

class MusicChange extends TriggerIntegration {

      getName(): string {
          return 'MusicChange'
      }

      getServiceName(): ServiceName {
          return ServiceName.Spotify
      }

      getDescription(): string {
          return 'Trigger when the music is changed'
      }

      getFields(): Field[] {
          return []
      }

      getFieldsDefinition(): FieldDefinition[] {
          return []
      }

      getIngredientsDefinition(): IngredientDefinition[] {
            return [
                {
                    name: 'name',
                    type: 'string',
                    description: 'The track that is playing'
                },
                {
                    name: 'artist',
                    type: 'string',
                    description: 'The artist of the track'
                },
                {
                    name: 'id',
                    type: 'string',
                    description: 'The id of the track'
                }
            ]
        }
}

export default MusicChange
