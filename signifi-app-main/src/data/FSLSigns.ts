/* A minimal slice.  Put *all* 26 signs here when you have the assets */
export interface FSLSign {
  label: string;
  src: ReturnType<typeof require>;
}

export const FSL_SIGNS: FSLSign[] = [
  { label: 'A', src: require('../../assets/fsl/A.png') },
  { label: 'B', src: require('../../assets/fsl/B.png') },
  { label: 'C', src: require('../../assets/fsl/C.png') },
  { label: 'D', src: require('../../assets/fsl/D.png') },
  { label: 'E', src: require('../../assets/fsl/E.png') },
  { label: 'F', src: require('../../assets/fsl/F.png') },
  { label: 'G', src: require('../../assets/fsl/G.png') },
  { label: 'H', src: require('../../assets/fsl/H.png') },
  { label: 'I', src: require('../../assets/fsl/I.png') },
  { label: 'J', src: require('../../assets/fsl/J.png') },
  { label: 'K', src: require('../../assets/fsl/K.png') },
  { label: 'L', src: require('../../assets/fsl/L.png') },
  { label: 'M', src: require('../../assets/fsl/M.png') },
  { label: 'N', src: require('../../assets/fsl/N.png') },
  { label: 'O', src: require('../../assets/fsl/O.png') },
  { label: 'P', src: require('../../assets/fsl/P.png') },
  { label: 'Q', src: require('../../assets/fsl/Q.png') },
  { label: 'R', src: require('../../assets/fsl/R.png') },
  { label: 'S', src: require('../../assets/fsl/S.png') },
  { label: 'T', src: require('../../assets/fsl/T.png') },
  { label: 'U', src: require('../../assets/fsl/U.png') },
  { label: 'V', src: require('../../assets/fsl/V.png') },
  { label: 'W', src: require('../../assets/fsl/W.png') },
  { label: 'X', src: require('../../assets/fsl/X.png') },
  { label: 'Y', src: require('../../assets/fsl/Y.png') },
  { label: 'Z', src: require('../../assets/fsl/Z.png') },
];
