import { styled } from "@mui/system";


export const TextSubTitle = styled("p")`
  color: var(--primary-text);
  font-size: 20px;
  line-height: 1.6;
  margin-top: 8px;
  margin-bottom: 0;
  font-weight: 1200;
`;

export const TextInfo = styled("p")`
  color: var(--primary-text);
  font-size: 13px;
  opacity: 0.6;
  margin-top: 4px;
  margin-bottom: 6px;
  font-weight: 400;
  @media (min-width: 1000px) {
    padding-right: 150px;
  }
`;

export const ResponsiveWrapper = styled("div")`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
 
`;