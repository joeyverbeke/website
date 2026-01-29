'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import PieceLayout from '@/components/PieceLayout';
import styles from './page.module.css';

// Art piece names for lookup
const artPieces = [
  { slug: "gradi-vox", title: "Gradi Vox" },
  { slug: "gradi", title: "Gradi" },
  { slug: "porous", title: "Porous" },
  { slug: "t.a.e.l.", title: "T.A.E.L." },
  { slug: "in-vivo-in-vitro-trial-1.4", title: "In Vivo / In Vitro - Trial 1.4" }
];

export default function ArtPiecePage() {
  const { slug } = useParams();
  const [artPiece, setArtPiece] = useState<{ slug: string, title: string } | undefined>(undefined);
  
  useEffect(() => {
    // Find the matching art piece
    const piece = artPieces.find(p => p.slug === slug);
    setArtPiece(piece);
  }, [slug]);

  if (!artPiece) {
    return (
      <div className={styles.container}>
        <h1>Art Piece Not Found</h1>
        <Link href="/">Return Home</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{artPiece.title}</h1>
      <PieceLayout className={styles.content}>
        <p>Detailed information about this art piece will go here.</p>
      </PieceLayout>
      <Link href="/" className={styles.backLink}>Return to Gallery</Link>
    </div>
  );
} 
