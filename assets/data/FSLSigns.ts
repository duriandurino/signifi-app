/* A minimal slice.  Put *all* 26 signs here when you have the assets */
import { ImageSourcePropType } from 'react-native';

export interface FSLSign {
  label: string;
  src: ImageSourcePropType;
}

export const FSL_SIGNS: FSLSign[] = [
  { label: 'A', src: require('../images/fsl/A.png') },
  { label: 'B', src: require('../images/fsl/B.png') },
  { label: 'C', src: require('../images/fsl/C.png') },
  { label: 'D', src: require('../images/fsl/D.png') },
  { label: 'E', src: require('../images/fsl/E.png') },
  { label: 'F', src: require('../images/fsl/F.png') },
  { label: 'G', src: require('../images/fsl/G.png') },
  { label: 'H', src: require('../images/fsl/H.png') },
  { label: 'I', src: require('../images/fsl/I.png') },
  { label: 'J', src: require('../images/fsl/J.png') },
  { label: 'K', src: require('../images/fsl/K.png') },
  { label: 'L', src: require('../images/fsl/L.png') },
  { label: 'M', src: require('../images/fsl/M.png') },
  { label: 'N', src: require('../images/fsl/N.png') },
  { label: 'O', src: require('../images/fsl/O.png') },
  { label: 'P', src: require('../images/fsl/P.png') },
  { label: 'Q', src: require('../images/fsl/Q.png') },
  { label: 'R', src: require('../images/fsl/R.png') },
  { label: 'S', src: require('../images/fsl/S.png') },
  { label: 'T', src: require('../images/fsl/T.png') },
  { label: 'U', src: require('../images/fsl/U.png') },
  { label: 'V', src: require('../images/fsl/V.png') },
  { label: 'W', src: require('../images/fsl/W.png') },
  { label: 'X', src: require('../images/fsl/X.png') },
  { label: 'Y', src: require('../images/fsl/Y.png') },
  { label: 'Z', src: require('../images/fsl/Z.png') },
];
