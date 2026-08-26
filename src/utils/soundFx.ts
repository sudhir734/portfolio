// Sound effects disabled
class SoundEffectsManager {
  public enabled: boolean = false;
  public playHover() {}
  public playClick() {}
  public playCyberBlip() {}
  public playAuth() {}
}

export const soundFx = new SoundEffectsManager();
