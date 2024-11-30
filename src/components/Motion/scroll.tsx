import { Container } from "@mui/material";
import "./style.css";
import { motion, Variants } from "framer-motion";
import { CartItem } from "@/lib/slices/DropShip/AddToCartSlice";
import { Pages } from "@/Datatypes/enums";
import { useNavigate } from "react-router-dom";
import { useShowOutlet } from "@/context/showOutletContext";
import { IDropShipItem } from "@/Datatypes/interfaces/interface";

interface Props {
    item: IDropShipItem;
    hueA: number;
    hueB: number;
}

const cardVariants: Variants = {
    offscreen: {
        y: 300,
    },
    onscreen: {
        y: 50,
        rotate: -10,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8,
        },
    },
};

const hue = (h: number) => `hsl(${h}, 100%, 50%)`;

function Card({ item, hueA, hueB }: Props) {
    const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;
    const navigate = useNavigate();
    const { setShowOutlet } = useShowOutlet();

    const handleNavigate = (href: string) => {
        console.log("Navigating to:", href);
        navigate(href);
        setShowOutlet(true);
    };

    return (
        <>
            <motion.div
                className="card-container"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.8 }}
            >
                <div className="splash" style={{ background }} />
                <motion.div className="card" variants={cardVariants}>
                    <img
                        src={item.image ? `data:image/png;base64,${item.image}` : "/placeholder.png"}
                        alt={item.name || "Product image"}
                        className="w-[2em] h-[2em] md:w-[3em] md:h-[4em] object-cover rounded-md"
                        onClick={() => {
                            if (item && item.id && item.title) {
                                const href = Pages.SINGLE_DROPSHIP_ITEM.replace(
                                    ":dropShipItemTitle",
                                    item.title
                                ).replace(":id", item.id);
                                handleNavigate(href);
                            } else {
                                console.warn("Invalid item data for navigation", item);
                            }
                        }}
                    />
                </motion.div>
            </motion.div>
        </>
    );
}

interface ScrollProps {
    parsedNotes: IDropShipItem[];
    loading:boolean
}

export default function Scroll({ parsedNotes,loading }: ScrollProps) {
    const hues = [340, 20, 60, 80, 100, 205, 260, 290]; // Example hues for cards

    return (
        <Container className="myCard container">
            {parsedNotes.map((item, index) => (
                <Card
                    key={item.id}
                    item={item}
                    hueA={hues[index % hues.length]}
                    hueB={hues[(index + 1) % hues.length]}
                />
            ))}
        </Container>
    );
}
