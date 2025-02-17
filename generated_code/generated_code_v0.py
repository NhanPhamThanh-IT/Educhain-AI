import pygame
import random
import math

# Initialize Pygame
pygame.init()

# Constants
WIDTH, HEIGHT = 800, 600
FPS = 60
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
YELLOW = (255, 255, 0)

# Screen setup
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Tower Defense")
clock = pygame.time.Clock()

# Classes
class Tower:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.range = 100
        self.damage = 1
        self.cooldown = 60
        self.timer = 0

    def draw(self):
        pygame.draw.circle(screen, BLUE, (self.x, self.y), 20)
        pygame.draw.circle(screen, BLACK, (self.x, self.y), self.range, 1)

    def shoot(self, enemies):
        if self.timer <= 0:
            for enemy in enemies:
                distance = math.hypot(self.x - enemy.x, self.y - enemy.y)
                if distance < self.range:
                    enemy.health -= self.damage
                    self.timer = self.cooldown
                    break
        else:
            self.timer -= 1

class Enemy:
    def __init__(self, path):
        self.path = path
        self.index = 0
        self.x, self.y = self.path[self.index]
        self.speed = 2
        self.health = 3

    def move(self):
        if self.index < len(self.path) - 1:
            target_x, target_y = self.path[self.index + 1]
            angle = math.atan2(target_y - self.y, target_x - self.x)
            self.x += self.speed * math.cos(angle)
            self.y += self.speed * math.sin(angle)
            if math.hypot(target_x - self.x, target_y - self.y) < self.speed:
                self.index += 1

    def draw(self):
        pygame.draw.circle(screen, RED, (int(self.x), int(self.y)), 10)

    def is_dead(self):
        return self.health <= 0

class Bullet:
    def __init__(self, x, y, target):
        self.x = x
        self.y = y
        self.target = target
        self.speed = 5
        self.color = YELLOW

    def move(self):
        angle = math.atan2(self.target.y - self.y, self.target.x - self.x)
        self.x += self.speed * math.cos(angle)
        self.y += self.speed * math.sin(angle)

    def draw(self):
        pygame.draw.circle(screen, self.color, (int(self.x), int(self.y)), 5)

# Game setup
path = [(100, 300), (200, 300), (300, 400), (400, 400), (500, 300), (700, 300)]
towers = []
enemies = []
bullets = []

spawn_rate = 120
spawn_timer = spawn_rate

def spawn_enemy():
    enemies.append(Enemy(path))

def main():
    global spawn_timer
    running = True
    while running:
        clock.tick(FPS)
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.MOUSEBUTTONDOWN:
                x, y = pygame.mouse.get_pos()
                towers.append(Tower(x, y))

        screen.fill(WHITE)

        # Draw path
        pygame.draw.lines(screen, BLACK, False, path, 5)

        # Spawn enemies
        spawn_timer -= 1
        if spawn_timer <= 0:
            spawn_enemy()
            spawn_timer = spawn_rate

        # Update and draw enemies
        for enemy in enemies[:]:
            enemy.move()
            enemy.draw()
            if enemy.is_dead():
                enemies.remove(enemy)

        # Update and draw towers
        for tower in towers:
            tower.draw()
            tower.shoot(enemies)

        # Update and draw bullets
        for bullet in bullets[:]:
            bullet.move()
            bullet.draw()
            if math.hypot(bullet.x - bullet.target.x, bullet.y - bullet.target.y) < 10:
                bullet.target.health -= 1
                bullets.remove(bullet)

        pygame.display.flip()

    pygame.quit()

if __name__ == "__main__":
    main()