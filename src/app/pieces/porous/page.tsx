'use client';

import HomeButton from '@/components/HomeButton';

const ORIGINAL_TEXT = `Quietly inhabiting spaces we barely notice, Porous is part of a broader guerrilla ecology: viral anomalies discreetly embedded into objects across the urban landscape, murmuring beneath perception. Activated only when the surrounding environment swells into noise, the object softly emits hallucinatory fragments—absurd, surreal earworms that slip imperceptibly beneath conscious attention, embedding themselves in the listener's subconscious.

According to Cary Wolfe, posthumanism names "a historical moment in which the decentering of the human by its imbrication in technical, medical, informatics, and economic networks is increasingly impossible to ignore". Porous examines AI hallucination as a possibility of posthuman dissidence to decolonize the subconscious.

In this interplay of subliminal whispers, hallucination becomes a method of infiltration—porous, unpredictable, subversively subjective. Each anomaly fractures the boundaries we trust between the conscious and unconscious, digital and physical, order and randomness. Refusing definition as either emancipatory or oppressive, Porous is a quiet provocation, inviting reflection on how subtle forms of influence, carried within the mundane, shape collective experience and distort the edges of our reality.

Collaborator: Koi Ren
Year: 2025
Materials: Outlet, Thermoplastic, Spray Paint, Microelectronics, AI Sound`;

export default function PorousPage() {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'black',
      color: 'white',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <HomeButton />
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          marginBottom: '2rem',
          fontWeight: '500'
        }}>
          Porous
        </h1>

        <div style={{ 
          width: '100%',
          height: '600px',
          background: 'rgba(255,255,255,0.1)',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255,255,255,0.5)'
        }}>
          [Placeholder Image]
        </div>

        <div style={{ 
          fontSize: '1.1rem',
          lineHeight: '1.6',
          marginBottom: '2rem',
          whiteSpace: 'pre-wrap'
        }}>
          {ORIGINAL_TEXT}
        </div>
      </div>
    </div>
  );
} 