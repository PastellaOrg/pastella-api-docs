import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'RandomX Algorithm',
    description: (
      <>
        Mine Pastella with the RandomX proof-of-work algorithm, designed to be
        ASIC-resistant and accessible to CPU miners.
      </>
    ),
  },
  {
    title: 'Simple Reward Staking',
    description: (
      <>
        Earn passive income by staking your PAS holdings. No complex setup required -
        just hold coins in your wallet and earn rewards.
      </>
    ),
  },
  {
    title: 'On-Chain Governance',
    description: (
      <>
        Vote on proposals and help shape the future of Pastella. All holders can
        participate in decentralized decision-making.
      </>
    ),
  },
];

function Feature({title, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
