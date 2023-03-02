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
                  name: 'title',
                  description: 'The title of the music',
                  type: 'string'
              },
              {
                  name: 'artist',
                  description: 'The artist of the music',
                  type: 'string'
              },
              {
                  name: 'album',
                  description: 'The album of the music',
                  type: 'string'
              },
              {
                  name: 'image',
                  description: 'The image of the music',
                  type: 'string'
              },
              {
                  name: 'duration',
                  description: 'The duration of the music',
                  type: 'number'
              },
              {
                  name: 'progress',
                  description: 'The progress of the music',
                  type: 'number'
              },
              {
                  name: 'is_playing',
                  description: 'If the music is playing',
                  type: 'boolean'
              }
          ]
      }
  
}