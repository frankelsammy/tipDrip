import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export default function NavBar() {
  return (
    <header className="bg-white shadow-md px-8 py-4 flex items-center justify-between">
      <div className="text-xl font-bold">tipdrip</div>

      <NavigationMenu>
        <NavigationMenuList className="flex gap-6 list-none">
          <NavigationMenuItem className="list-none">
            <NavigationMenuTrigger className="px-4 py-2 hover:bg-gray-100 rounded-md">
              My Account
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-white p-4 shadow-lg rounded-md flex flex-col gap-2 w-48">
              <NavigationMenuLink href="/product1" className="px-2 py-1 hover:bg-gray-100 rounded-md">
                Product 1
              </NavigationMenuLink>
              <NavigationMenuLink href="/product2" className="px-2 py-1 hover:bg-gray-100 rounded-md">
                Product 2
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem className="list-none">
            <NavigationMenuLink href="/about" className="px-4 py-2 hover:bg-gray-100 rounded-md">
              About Us
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
