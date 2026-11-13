export const scenes = {
  issue: { title: 'Trip Issues', description: 'Info and the native support walkthrough.', height: 600 },
  chat: { title: 'Chat', description: 'A prepared reply and the rider’s actual scripted response.', height: 640 },
  actions: { title: 'Actions', description: 'Command-A opens native Search. Find Payment Actions, then close.', height: 500 },
  details: { title: 'Details', description: 'The same driver, trip and native payment tabs.', height: 640 },
  map: { title: 'Map', description: 'Play to pickup, pause, inspect the native point and seek back.', height: 600 },
} as const
export type SceneId = keyof typeof scenes
export const sceneIds = Object.keys(scenes) as SceneId[]
export function isSceneId(value: string): value is SceneId { return Object.hasOwn(scenes, value) }
export const sceneUrl = (id: SceneId) => '/preview/citymobil-features/' + id
