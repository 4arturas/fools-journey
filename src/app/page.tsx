import {Card} from "@/app/components/card/Card";
import {ECard} from "@/app/utils";

export default function Home() {
  return (
    <main>
        <table style={{width:'100%', height:'100%'}} border={1}>
            <tbody>
                <tr>
                    <td>Past</td>
                    <td colSpan={3}>Adventure</td>
                    <td>Future</td>
                </tr>
                <tr>
                    <td>Wisdom</td>
                    <td>Shield</td>
                    <td><Card card={ECard.Fool}/></td>
                    <td>Sword</td>
                    <td>Satchel</td>
                </tr>
            </tbody>
        </table>
    </main>
  );
}
